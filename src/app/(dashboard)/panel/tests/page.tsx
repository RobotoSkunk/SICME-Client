
'use client';

import DynamicTable from '@/components/DynamicTable';


export default function Page()
{
	return (<>
		<h1>Pruebas</h1>
		<DynamicTable
			fields={ [
				{
					name: 'col_1',
					type: 'text',
					label: 'Columna 1',
				},
				{
					name: 'col_2',
					type: 'number',
					label: 'Columna 2',
				},
				{
					name: 'col_3',
					type: 'date',
					label: 'Columna 3',
				},
			] }
			
			pagesCount={ 1 }

			rows={
				[... new Array(50)].map(_ => ({
					col_1: 'texto',
					col_2: 12345,
					col_3: new Date(),
				}))
			}
		/>
	</>);
}
