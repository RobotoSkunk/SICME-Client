
'use client';

import Image from 'next/image';
import { CSSProperties, HTMLInputTypeAttribute, useState } from 'react';

import style from './style.module.css';

import imgSearchIcon from '@/assets/img/icons/search.svg';


// #region Tipos de entradas
interface FieldBase
{
	/**
	 * El nombre de la propiedad que se enviará por un formulario HTML.
	 */
	name: string;

	/**
	 * Un nombre leíble por el usuario.
	 */
	label: string;
	required?: boolean;
	className?: string;
	style?: CSSProperties;

	/**
	 * Indica si el campo debe ser omitido en la tabla, pero mostrarse al momento de crear o modificar una entrada.
	 */
	hideOnTable?: boolean;
}

interface TextAreaField extends FieldBase
{
	type: 'textarea';

	rows?: number;
	cols?: number;
	minLength?: number;
	maxLength?: number;
};

interface InputField extends FieldBase
{
	type:
		| 'checkbox'
		| 'radio'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'image'
		| 'number'
		| 'password'
		| 'tel'
		| 'text'
		| 'time';

	min?: number;
	max?: number;
};


export type Field = TextAreaField | InputField;
// #endregion

type TypeMap<T extends string> =
	T extends 'textarea'       ? string  :
	T extends 'checkbox'       ? boolean :
	T extends 'radio'          ? boolean :
	T extends 'date'           ? Date    :
	T extends 'datetime-local' ? Date    :
	T extends 'email'          ? string  :
	T extends 'number'         ? number  :
	T extends 'password'       ? string  :
	T extends 'tel'            ? string  :
	T extends 'text'           ? string  :
	T extends 'time'           ? string  :
	string;


type Props = {
	/**
	 * Define la estructura de los campos de la tabla.
	 */
	fields: readonly Field[];

	/**
	 * Establece el número máximo de páginas que se encuentran disponibles; esta propiedad es meramente decorativa.
	 * Si el número de páginas es menor o igual a 0, las opciones de paginación son omitidas de la tabla.
	 */
	pagesCount: number;

	/**
	 * Las filas a mostrar en la tabla.
	 */
	rows: {
		readonly [ K in Props['fields'][number] as K['name'] ]: TypeMap<K['type']>;
	}[];

	/**
	 * El texto personalizado del botón para crear una nueva entrada.
	 */
	newEntryLabel?: string;

	/**
	 * Se ejecuta cuando el usuario da clic en una opción para crear una nueva entrada. Si no se especifica, las
	 * opciones para crear entradas son omitidas de la interfaz.
	 * @returns Verdadero si la operación fue exitosa.
	 */
	onCreate?: () => Promise<boolean>;

	/**
	 * Se ejecuta cuando el usuario da clic en una opción para actualizar una entrada. Si no se especifica, las
	 * opciones para actualizar entradas son omitidas de la interfaz.
	 * @returns Verdadero si la operación fue exitosa.
	 */
	onUpdate?: () => Promise<boolean>;

	/**
	 * Se ejecuta cuando el usuario da clic en una opción para eliminar una entrada. Si no se especifica, las
	 * opciones para eliminar entradas son omitidas de la interfaz.
	 * @returns Verdadero si la operación fue exitosa.
	 */
	onDelete?: () => Promise<boolean>;

	/**
	 * Se ejecuta automáticamente cuando el usuario busca cambiar a otra página.
	 * @returns Verdadero si la operación fue exitosa.
	 */
	onRequestPage?: (page: number) => Promise<boolean>;
};

// type FieldsToJson<T extends readonly Field[]> = {
// 	[ K in T[number] as K['name'] ]: TypeMap<K['type']>;
// };


export default function DynamicTable({
	fields,
	rows,
	newEntryLabel,
}: Props)
{
	const [ page, setPage ] = useState(0);

	// if (onRead) {
	// 	const result = await onRead(0);

	// 	result.rows[0].
	// }


	return (
		<div className={ style['dynamic-table'] }>
			<div className={ style['top-part'] }>
				<label
					className={ style.searchbar }
					htmlFor='search-input'
				>
					<Image
						src={ imgSearchIcon }
						alt=''

						width={ 25 }
					/>
					<input type='search' id='search-input'/>
				</label>

				<button

				>
					{ newEntryLabel ?? 'Nueva entrada' }
				</button>
			</div>

			<div className={ style.table }>
				<div className={ style.row }>
					{ fields.map((field, i) =>
					{
						if (field.hideOnTable) {
							return null;
						}

						return (
							<div className={ style.cell } key={ i }>
								{ field.label }
							</div>
						);
					}) }

					<div className={ style.cell } style={{ width: 150 }}>
						Acciones
					</div>
				</div>
				{ rows.map((row, i) =>
				(
					<div className={ style.row } key={ i }>
						{ Object.keys(row).map((key, i) =>
						{
							let value = row[key] as TypeMap<typeof key>;

							if (typeof value === 'object') {
								value = (value as Date).toLocaleDateString();
							}

							return (
								<div className={ style.cell } key={ i }>
									{ value }
								</div>
							);
						}) }
					</div>
				)) }
			</div>
		</div>
	);
}
