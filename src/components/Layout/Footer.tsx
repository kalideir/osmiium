import Link from 'next/link';
import siteMetadata from '../../../data/siteMetadata';
import Icon from '../icons';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <p className="text-xl mb-3 uppercase">Add me on</p>
        <div className="mb-5 flex space-x-4">
          <Icon kind="mail" href={`mailto:${siteMetadata.email}`} size={8} />
          <Icon kind="github" href={siteMetadata.github} size={8} />
          <Icon kind="linkedin" href={siteMetadata.linkedin} size={8} />
          <Icon kind="twitter" href={siteMetadata.twitter} size={8} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`Osmiium © ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  );
}
