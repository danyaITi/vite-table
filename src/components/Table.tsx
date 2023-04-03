import { useMemo, useState } from 'react';
import { TypePost } from '../types/types';
import img from '../assets/group.png';

type ObjSort = {
	key: string;
	name: string;
}[];

const Table: React.FC<{ posts: TypePost[] }> = ({ posts }) => {
	const [sorting, setSorting] = useState<boolean>(false);
	const [bySort, setBySort] = useState<string>('');

	const obj: ObjSort = [
		{
			key: 'id',
			name: 'ID'
		},
		{
			key: 'title',
			name: 'Заголовок'
		},
		{
			key: 'body',
			name: 'Описание'
		}
	];

	const onClickSort = (key: string) => {
		setSorting(!sorting);
		setBySort(key);
	};

	const sortPosts = useMemo(() => {
		const newArr = [...posts];

		return newArr
			.sort((a, b) => {
				if (a[bySort as keyof TypePost] < b[bySort as keyof TypePost]) {
					return -1;
				}
				if (bySort === 'id') {
					return -1;
				}
				return 1;
			})
			.map(item => (
				<tr key={item.id}>
					<td className='text-center'>{item.id}</td>
					<td>{item.title}</td>
					<td>{item.body}</td>
				</tr>
			));
	}, [bySort]);

	return (
		<table className='shadow-xl bg-white'>
			<thead>
				<tr>
					{obj.map(item => (
						<th
							onClick={() => onClickSort(item.key)}
							key={item.key}
							className='bg-slate-600 text-left px-8 py-4 text-white'
						>
							<div className='flex items-center'>
								<span className='mr-3'>{item.name}</span>
								<img
									className={
										item.key === bySort && sorting
											? 'h-min rotate-180'
											: 'h-min'
									}
									src={img}
									alt='sort'
									width={12}
									height={12}
								/>
							</div>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sorting
					? sortPosts
					: posts.map(item => (
							<tr key={item.id}>
								<td className='text-center'>{item.id}</td>
								<td>{item.title}</td>
								<td>{item.body}</td>
							</tr>
					  ))}
			</tbody>
		</table>
	);
};

export default Table;
