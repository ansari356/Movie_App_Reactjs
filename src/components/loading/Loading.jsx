import React from 'react'
import styles from './Loading.module.scss';
import logo from '../../assets/logosvg.svg';
import { Link } from 'react-router-dom';
export default function Loading() {
  return (
    <>

<div className={styles.container}>
  <div className={styles.loader} />
  <div className={styles.shadow} />
</div>

    
    </>
  )
}
