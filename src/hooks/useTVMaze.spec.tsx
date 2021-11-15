import { act, renderHook } from '@testing-library/react-hooks';

import { TVMazeProvider, useTVMaze } from './useTVMaze';

const mockedShows = [
  {
    id: 1,
    name: 'show test',
    type: 'type test',
    language: 'language test',
    genres: [],
    status: 'test',
    premiered: 'test',
    ended: 'test',
    weight: 1,
    rating: {
      average: 1,
    },
    image: {
      medium: 'test',
      original: 'test',
    },
    summary: 'test',
  },
];

let mockedData: any[] = [];

jest.mock('../services/api', () => {
  return {
    api: {
      get: () => {
        return {
          data: mockedData,
        };
      },
    },
  };
});

describe('TVMaze hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to load the list shows', async () => {
    mockedData = [...mockedShows];

    const { result } = renderHook(() => useTVMaze(), {
      wrapper: TVMazeProvider,
    });

    await act(() => result.current.loadShows());

    expect(result.current.shows[0].id).toBe(1);
  });

  it('should be able to load the list shows', () => {
    mockedData = [...mockedShows];

    const { result } = renderHook(() => useTVMaze(), {
      wrapper: TVMazeProvider,
    });

    act(() => result.current.setSearchShow('Test'));

    expect(result.current.shows[0].id).toBe(1);
  });
});
