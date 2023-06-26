import RequestItem from '@/components/RequestTable'
import styles from './page.module.css'
import ProductsTable from '@/components/ProductsTable'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Controle de pedidos</h1>
      <div className={styles.content}>
        <RequestItem />
        <ProductsTable />
      </div>

    </main>
  )
}
