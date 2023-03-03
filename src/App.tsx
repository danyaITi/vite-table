import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Table from './components/Table';
import { useFetch } from './services/useFetch';
import { RootState } from './store/store';

const App = () => {
	const [value, setValue] = useState('');

	const currentPage = useSelector(
		(state: RootState) => state.tableSlice.currentPage
	);
	const navigate = useNavigate();
	const path = window.location.pathname;

	const { getPosts, posts } = useFetch();

	const perPage = 10;
	const lastIndex = currentPage * perPage;
	const firstIndex = lastIndex - perPage;
	const currentPosts = posts.slice(firstIndex, lastIndex);

	const getSearchElements = () => {
		return currentPosts.filter(val => {
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
