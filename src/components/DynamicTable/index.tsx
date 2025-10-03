
'use client';

import Image from 'next/image';
import { CSSProperties, HTMLInputTypeAttribute } from 'react';

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
	value?: string;
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
	type: Omit<Omit<HTMLInputTypeAttribute, 'checkbox'>, 'radio'>;

	min?: number;
	max?: number;
};


export type Field = TextAreaField | InputField;
// #endregion


type Props = {
	/**
	 * Se ejecuta cuando el usuario da clic en una opción para crear una nueva entrada. Si no se especifica, las
	 * opciones para crear entradas son omitidas de la interfaz.
	 * @returns Verdadero si la operación fue exitosa.
	 */
	onCreate?: () => boolean | Promise<boolean>;

	/**
	 * Se ejecuta cuando el usuario da clic en una opción para actualizar una entrada. Si no se especifica, las
	 * opciones para actualizar entradas son omitidas de la interfaz.
	 * @returns Verdadero si la operación fue exitosa.
	 */
	onUpdate?: () => boolean | Promise<boolean>;

	/**
	 * Se ejecuta cuando el usuario da clic en una opción para eliminar una entrada. Si no se especifica, las
	 * opciones para eliminar entradas son omitidas de la interfaz.
	 * @returns Verdadero si la operación fue exitosa.
	 */
	onDelete?: () => boolean | Promise<boolean>;

	/**
	 * Define la estructura de las entradas de la tabla.
	 */
	fields: Field[];
};


export default function DynamicTable({
	
}: Props)
{
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
			</div>
		</div>
	);
}
