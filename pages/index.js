import Link from 'next/link'
console.log(process.env.TEST)
export default function IndexPage() {
  return (
    <div>
      Hello World.{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  )
}
