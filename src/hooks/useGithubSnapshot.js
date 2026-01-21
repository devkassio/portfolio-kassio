import { useEffect, useState } from 'react';

const DEFAULT_TTL = 1000 * 60 * 60 * 12;

const normalizeUrl = (value) => {
  if (!value) {
    return '';
  }
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return `https://${value}`;
};

const mapProfile = (data, fallback) => {
  if (!data) {
    return fallback;
  }

  const createdYear = data.created_at
    ? new Date(data.created_at).getFullYear()
    : fallback.createdYear;
  const updatedAt = data.updated_at || fallback.updatedAt;

  return {
    login: data.login || fallback.login,
    name: (data.name || fallback.name || '').trim(),
    bio: data.bio || fallback.bio,
    location: data.location || fallback.location,
    company: data.company || fallback.company,
    blog: normalizeUrl(data.blog) || fallback.blog,
    publicRepos: data.public_repos ?? fallback.publicRepos,
    followers: data.followers ?? fallback.followers,
    following: data.following ?? fallback.following,
    createdAt: data.created_at || fallback.createdAt,
    createdYear,
    updatedAt,
    avatarUrl: data.avatar_url || fallback.avatarUrl,
  };
};

const summarizeLanguages = (repos, fallback) => {
  if (!repos?.length) {
    return fallback;
  }

  const counts = new Map();
  for (const repo of repos) {
    if (!repo.language) {
      continue;
    }
    counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
};

const readCache = (key, ttl) => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || !parsed?.data) {
      return null;
    }
    if (Date.now() - parsed.timestamp > ttl) {
      return null;
    }
    return parsed.data;
  } catch (error) {
    return null;
  }
};

const writeCache = (key, data) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (error) {
    // Ignore cache write errors.
  }
};

export default function useGithubSnapshot({ username, fallback, ttl = DEFAULT_TTL }) {
  const [snapshot, setSnapshot] = useState(fallback);

  useEffect(() => {
    if (!username) {
      return undefined;
    }

    const cacheKey = `github-snapshot:${username}`;
    const cached = readCache(cacheKey, ttl);
    if (cached) {
      setSnapshot(cached);
      return undefined;
    }

    const controller = new AbortController();

    const load = async () => {
      try {
        const [profileResponse, repoResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
            signal: controller.signal,
          }),
        ]);

        if (!profileResponse.ok) {
          throw new Error('Github profile request failed');
        }

        const profileData = await profileResponse.json();
        const reposData = repoResponse.ok ? await repoResponse.json() : [];

        const nextSnapshot = {
          profile: mapProfile(profileData, fallback.profile),
          languages: summarizeLanguages(reposData, fallback.languages),
        };

        setSnapshot(nextSnapshot);
        writeCache(cacheKey, nextSnapshot);
      } catch (error) {
        setSnapshot(fallback);
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [username, fallback, ttl]);

  return snapshot;
}
