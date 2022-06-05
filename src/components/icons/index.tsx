import Mail from './mail.svg';
import Github from './github.svg';
import Facebook from './facebook.svg';
import Youtube from './youtube.svg';
import Linkedin from './linkedin.svg';
import Twitter from './twitter.svg';
import { motion } from 'framer-motion';

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

const Icon = ({
  kind,
  href,
  size = 8,
}: {
  kind: keyof typeof components;
  href: string;
  size?: number;
}) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null;

  const Svg = components[kind];

  return (
    <motion.a
      whileHover={{ scale: 1.4 }}
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <Svg
        className={`transition ease-in-out delay-100 fill-current text-gray-700 hover:text-indigo-500 dark:text-gray-200 dark:hover:text-indigo-400 h-${size} w-${size}`}
      />
    </motion.a>
  );
};

export default Icon;
