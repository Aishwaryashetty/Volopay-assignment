import * as Constants from '../Constants';
import axios from 'axios';
/*
Api call to get data based on searchPhrase or trending
* Limit - The maximum number of objects to return.
* offset - Specifies the starting position of the results.
* returns data and success.
*/
export const getGiphyApiResponse = (offset: number, searchPhrase: string) => {
  let response = {
    data: null,
    success: false,
  };
  const SearchUrl = `http://api.giphy.com/v1/gifs/search?q=${searchPhrase}&api_key=${Constants.ApiKey}&limit=${Constants.Limit}&offset=${offset}`;
  const TrendingUrl = `http://api.giphy.com/v1/gifs/trending?api_key=${Constants.ApiKey}&limit=${Constants.Limit}&offset=${offset}`;

  const url = searchPhrase ? SearchUrl : TrendingUrl;
  return axios(url, {method: 'Get'})
    .then(res => {
      response.success = true;
      response.data = res.data.data.map((obj: any) => {
        return {
          id: obj.id,
          url: obj.images.original.url,
        };
      });
      return response;
    })
    .catch(error => {
      console.log('error', error);
    });
};
