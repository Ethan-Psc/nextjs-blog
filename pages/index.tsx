import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { getUserFromReq } from 'utils/server'
const self_introduction = 'Hello,I‘m Ethan. I am a developing FE engineer!'
const self_description = ` (This is a sample website - I’ll be building a site like this on
<a href="https://www.nextjs.cn/docs">our Next.js tutorial</a>.)`
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{self_introduction}</p>
        <p dangerouslySetInnerHTML={{ __html: self_description }} />
      </section>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
export async function getServerSideProps(ctx) {
  // console.log(ctx)
  // const user = await getUserFromReq(ctx.req);
  // if (!user) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   }
  // }
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
