
import { Spin } from 'antd';
import { FC } from 'react'
import cl from './Loader.module.scss';
import { LoaderProps } from './models';

const Loader: FC<LoaderProps> = ({prop}) => {
return (
	<div className={cl.loader}><Spin /></div>
);
};

export { Loader };