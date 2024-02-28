import axios, { AxiosResponse } from 'axios';

interface Name {
  first: string;
  last: string;
}

interface Result {
  name: Name;
  gender: string;
  email: string;
  phone: string;
  nat: string;
}

interface RandomUserResponse {
  results: Result[];
}

export interface Student {
  name: string;
  gender: string;
  email: string;
  phone: string;
  nationality: string;
}

const fetchData = async (): Promise<Student[]> => {
  try {
    const response: AxiosResponse<RandomUserResponse> = await axios.get<RandomUserResponse>('https://randomuser.me/api/?results=10');
    const data: Result[] = response.data.results;
    const students: Student[] = data.map((result: Result) => ({
      name: `${result.name.first} ${result.name.last}`,
      gender: result.gender,
      email: result.email,
      phone: result.phone,
      nationality: result.nat,
    }));
    return students;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchData;
