import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Table from './components/Table';
import { useFetch } from './services/useFetch';
import { RootState } from './store/store';
import { TypePost } from './types/types';

const App: React.FC = () => {
	const [value, setValue] = useState<string>('');

	const currentPage = useSelector(
		(state: RootState) => state.tableSlice.currentPage
	);
	const navigate = useNavigate();
	const path = window.location.pathname;

	const { getPosts, posts } = useFetch();

	const perPage: number = 10;
	const lastIndex: number = currentPage * perPage;
	const firstIndex: number = lastIndex - perPage;
	const currentPosts: TypePost[] = posts.slice(firstIndex, lastIndex);

	const getSearchElements = () => {
		return currentPosts.filter((val: TypePost) => {
			if (val.title.toLowerCase().includes(value.toLowerCase())) {
				return true;
			} else {
				return false;
			}
		});
	};

	useEffect(() => {
		getPosts();
		getSearchElements();
		navigate(`${path}?page=${currentPage}`);
	}, [path, navigate, currentPage, value]);

	return (
		<>
			<Search onSearch={setValue} value={value} />
			<Table posts={value.length > 1 ? getSearchElements() : currentPosts} />
			<Pagination perPage={perPage} posts={posts} currentPage={currentPage} />
		</>
	);
};

export default App;
