import axios, { AxiosResponse } from 'axios';

interface Name {
  first: string;
  last: string;
}

interface Picture {
  large: string;
}

interface Location {
  country: string;
  street: {
    name: string;
  };
}

interface Result {
  name: Name;
  picture: Picture
  gender: string;

  email: string;
  phone: string;
  location: Location;
}

interface RandomUserResponse {
  results: Result[];
}

export interface Student {
  name: string;
  img:  string;
  gender: string;
  street: string;
  email: string;
  phone: string;
  location: string;
}

const fetchData = async (): Promise<Student[]> => {
  try {
    const response: AxiosResponse<RandomUserResponse> = await axios.get<RandomUserResponse>('https://randomuser.me/api/?results=10');
    const data: Result[] = response.data.results;
    const students: Student[] = data.map((result: Result) => ({
      img: `${result.picture.large}`,
      name: `${result.name.first} ${result.name.last}`,
      gender: result.gender,
      street: `${result.location.street.name}`,
      email: result.email,
      phone: result.phone,
      location: `${result.location.country}`,
    }));
    return students;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchData;
