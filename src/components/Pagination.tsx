import { useDispatch } from 'react-redux/es/exports';
import { setCurrentPage } from '../store/reducers/tableSlice';
import { TypePost } from '../types/types';

interface PaginationProps {
	posts: TypePost[];
	perPage: number;
	currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
	posts,
	perPage,
	currentPage
}) => {
	const dispatch = useDispatch();
	return (
		<div className='flex justify-between px-2 mt-5'>
			<button
				disabled={currentPage <= 1}
				onClick={() => dispatch(setCurrentPage(currentPage - 1))}
			>
				Назад
			</button>
			<ul className='flex'>
				{[...new Array(Math.ceil(posts.length / perPage))].map((_, idx) => (
					<li
						key={idx}
						className={
							currentPage - 1 === idx
								? 'mr-5 text-lime-500 text-lg cursor-pointer'
								: 'mr-5 text-lg cursor-pointer'
						}
						onClick={() => dispatch(setCurrentPage(idx + 1))}
					>
						{idx + 1}
					</li>
				))}
			</ul>
			<button
				disabled={currentPage >= Math.ceil(posts.length / perPage)}
				onClick={() => dispatch(setCurrentPage(currentPage + 1))}
			>
				Далее
			</button>
		</div>
	);
};

export default Pagination;
