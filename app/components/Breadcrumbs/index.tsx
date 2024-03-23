import {Link, useMatches} from '@remix-run/react';

import instagramIcon from '~/assets/instagram.png';
import spotifyIcon from '~/assets/spotify.png';
import youtubeIcon from '~/assets/youtube.png';

export const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <SocialLinks />
      <BackButton />
    </div>
  );
};

const BackButton = () => {
  const backRoute = getBackRoute();

  if (backRoute) {
    return (
      <Link to={backRoute} className="button button--secondary">
        ← Terug
      </Link>
    );
  }
};

const getBackRoute = () => {
  // Regex routes
  const backRoutes: {[key: string]: string} = {
    'routes/products.$handle': '/',
  };

  let matches = useMatches();
  const id = matches.at(-1)?.id as string;

  if (backRoutes[id]) {
    return backRoutes[id];
  }

  return null;
};

const SocialLinks = () => {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/hang.youth',
      title: 'Instagram',
      icon: instagramIcon,
    },
    {
      href: 'https://open.spotify.com/artist/33s4eablBmnrPlE3y6CZFR',
      title: 'Spotify',
      icon: spotifyIcon,
    },
    {
      href: 'https://www.youtube.com/playlist?list=PL9QOCtUuEQBYAbjNIL0ZMY5SsuqpdUoBq',
      title: 'YouTube',
      icon: youtubeIcon,
    },
  ];

  return (
    <div className="social-links">
      {socialLinks.map((socialLink) => (
        <SocialLink key={socialLink.title} {...socialLink} />
      ))}
    </div>
  );
};

function SocialLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: string;
}) {
  return (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={title} />
    </a>
  );
}
