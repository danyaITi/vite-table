import { useState } from 'react';
import { TypePost } from '../types/types';

export const useFetch = () => {
	const [posts, setPosts] = useState<TypePost[]>([]);

	const getPosts = async (): Promise<void> => {
		const req = await fetch('https://jsonplaceholder.typicode.com/posts');
		const res = await req.json();

		setPosts(res);
	};

	return {
		getPosts,
		posts
	};
};
