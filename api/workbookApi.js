// import { API_KEY } from './config';
import { API_URL } from "./baseApi";

export const getWorkbook = async () => {
const { results } = await fetch(API_URL).then((x) => x.json());
const workbooks = results.map(
    ({
        _id,
        title,
        poster,
        // backdrop_path,
        // vote_average,
        desc,
        // release_date,
        genres_ids,
        }) => ({
        key: String(_id),
        title: title,
        poster: poster,
        // backdrop: getBackdropPath(backdrop_path),
        // rating: vote_average,
        description: desc,
        // releaseDate: release_date,
        genres: genres_ids.map(x => x),
    })
);

    return workbooks;
};
