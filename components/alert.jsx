import styles from '../styles/alert.module.css'
import cn from 'classnames'

export default function Alert({ children, type }) {
  return (
    <div
      className={type === 'success' ? styles.success ? styles.error}
    >
      {children}
    </div>
  )
}