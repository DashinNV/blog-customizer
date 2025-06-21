import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type Props = {
	stateArticle: ArticleStateType;
	setStateArticle: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ stateArticle, setStateArticle }: Props) => {
	const [stateParamsForm, setStateParamsForm] = useState(stateArticle);
	const [stateArrowButton, setStateArrowButton] = useState(false);
	const asideRef = useRef<HTMLDivElement | null>(null);

	const reverseArrowButton = () => setStateArrowButton((prev) => !prev);

	const updateOptionState = (option: OptionType) => {
		switch (true) {
			case option.className.includes('font-size'):
				setStateParamsForm((prev) => ({ ...prev, fontSizeOption: option }));
				break;
			case option.className.includes('font'):
				setStateParamsForm((prev) => ({ ...prev, fontColor: option }));
				break;
			case option.className.includes('bg'):
				setStateParamsForm((prev) => ({ ...prev, backgroundColor: option }));
				break;
			case option.className.includes('width'):
				setStateParamsForm((prev) => ({ ...prev, contentWidth: option }));
				break;
			default:
				setStateParamsForm((prev) => ({ ...prev, fontFamilyOption: option }));
		}
	};

	const restoreDefaultState = () => {
		setStateParamsForm(defaultArticleState);
	};

	const applyCurrentState = () => {
		setStateArticle(stateParamsForm);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		applyCurrentState();
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		restoreDefaultState();
	};

	useOutsideClickClose({
		isOpen: stateArrowButton,
		rootRef: asideRef,
		onChange: (newValue: boolean) => setStateArrowButton(newValue),
		onClose: () => {},
	});

	return (
		<>
			<ArrowButton isOpen={stateArrowButton} onClick={reverseArrowButton} />
			<aside
				ref={asideRef}
				className={clsx(
					styles.container,
					stateArrowButton && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase align='left'>
						задайте параметры
					</Text>
					<Select
						selected={stateParamsForm.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={updateOptionState}
						title='Шрифт'
					/>
					<RadioGroup
						name='Size'
						selected={stateParamsForm.fontSizeOption}
						options={fontSizeOptions}
						onChange={updateOptionState}
						title='Размер шрифта'
					/>
					<Select
						selected={stateParamsForm.fontColor}
						options={fontColors}
						onChange={updateOptionState}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={stateParamsForm.backgroundColor}
						options={backgroundColors}
						onChange={updateOptionState}
						title='Цвет фона'
					/>
					<Select
						selected={stateParamsForm.contentWidth}
						options={contentWidthArr}
						onChange={updateOptionState}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
