import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '../services/api';
import { cleanHtml } from '../utils/cleanHtml';

export type Show = {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  premiered: string;
  ended: string;
  weight: number;
  rating: {
    average: number;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
};

export type Episode = {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
};

export type Season = {
  id: number;
  number: number;
  episodeOrder: number;
};

type FetchSearchShowProps = {
  show: Show;
};

interface TVMazeContextData {
  show: Show | null;
  shows: Show[];
  searchShow: string;
  episodes: Episode[];
  seasons: Season[] | null;
  seasonSelected: number;
  setSeasonSelected(Dispatch: number): void;
  setShowSelected(Dispatch: number): void;
  getEpisodeById(id: number): Episode;
  loadShows(): void;
  loadShowInformation(): void;
  setSearchShow(Dispatch: string): void;
}

const TVMazeContext = createContext<TVMazeContextData>({} as TVMazeContextData);

interface Props {
  children: ReactNode;
}

export function TVMazeProvider({ children }: Props) {
  const [shows, setShows] = useState<Show[]>([]);
  const [show, setShow] = useState<Show | null>(null);
  const [showSelected, setShowSelected] = useState<number>(1955);
  const [seasons, setSeasons] = useState<Season[] | null>(null);
  const [seasonSelected, setSeasonSelected] = useState<number>(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchShow, setSearchShow] = useState('');

  const episodesBySeason = useMemo(() => {
    return episodes?.filter(episode => episode.season === seasonSelected);
  }, [seasonSelected, episodes]);

  const loadShowInformation = useCallback(async () => {
    try {
      const { data: loadedShow } = await api.get<Show>(`shows/${showSelected}`);

      const genresFormatted = loadedShow.genres.map((item, index) => {
        if (index === loadedShow.genres.length - 1) {
          return item;
        }
        return `${item}/`;
      });

      const loadedShowFormatted = {
        ...loadedShow,
        summary: cleanHtml(loadedShow.summary),
        genres: genresFormatted,
      };

      const { data: loadedSeasons } = await api.get<Season[]>(
        `shows/${showSelected}/seasons`,
      );

      const { data: loadedEpisodes } = await api.get<Episode[]>(
        `shows/${showSelected}/episodes`,
      );

      const loadedEpisodesFormatted = loadedEpisodes.map(episode => {
        return {
          ...episode,
          summary: cleanHtml(episode.summary),
        };
      });

      setShow(loadedShowFormatted);
      setEpisodes(loadedEpisodesFormatted);
      setSeasons(loadedSeasons);
    } catch (err: any) {
      //
      console.log(err);
    }
  }, [showSelected]);

  async function loadShows() {
    try {
      const { data: loadedShows } = await api.get<Show[]>('shows');

      const loadedShowsFormatted = loadedShows.map(item => {
        const genres = item.genres.map((genre, index) => {
          if (index === genre.length - 1) {
            return genre;
          }
          return `${item}/`;
        });

        return {
          ...item,
          summary: cleanHtml(item.summary),
          genres,
        };
      });
      setShows(loadedShowsFormatted);
    } catch (err: any) {
      //
      console.log(err);
    }
  }

  const loadShowsBySearch = useCallback(async () => {
    try {
      const { data: loadedShows } = await api.get<FetchSearchShowProps[]>(
        'search/shows',
        {
          params: {
            q: searchShow,
          },
        },
      );

      const loadedShowsFormatted = loadedShows.map(item => {
        const genres = item?.show?.genres?.map((genre, index) => {
          if (index === genre.length - 1) {
            return genre;
          }
          return `${item}/`;
        });

        return {
          ...item.show,
          summary: cleanHtml(item?.show.summary),
          genres,
        };
      });
      setShows([]);
      setShows(loadedShowsFormatted);
    } catch (err: any) {
      //
      console.log(err);
    }
  }, [searchShow]);

  const getEpisodeById = useCallback(
    (id: number): Episode => {
      return (
        episodesBySeason.find(episode => episode.id === id) || ({} as Episode)
      );
    },
    [episodesBySeason],
  );

  useEffect(() => {
    loadShowInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSelected]);

  useEffect(() => {
    if (searchShow) {
      loadShowsBySearch();
    } else {
      loadShows();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchShow]);

  return (
    <TVMazeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        show,
        shows,
        episodes: episodesBySeason,
        seasons,
        searchShow,
        seasonSelected,
        setShowSelected,
        setSeasonSelected,
        getEpisodeById,
        loadShowInformation,
        loadShows,
        setSearchShow,
      }}
    >
      {children}
    </TVMazeContext.Provider>
  );
}

export function useTVMaze(): TVMazeContextData {
  const context = useContext(TVMazeContext);

  return context;
}
