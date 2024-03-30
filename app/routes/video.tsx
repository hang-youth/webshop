import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {client} from '~/lib/contentful';

export const meta: MetaFunction = () => {
  return [{title: 'HANG YOUTH | VIDEOS'}];
};

const YOUTUBE_PLAYLIST_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/playlistItems';

export async function loader({context}: LoaderFunctionArgs) {
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PL9QOCtUuEQBYAbjNIL0ZMY5SsuqpdUoBq&key=${context.env.YOUTUBE_API_KEY}`,
  );
  const videos = ((await res.json()) as any).items;

  return defer({
    videos,
  });
}

export default function Tour() {
  const {videos} = useLoaderData<typeof loader>();
  return (
    <div className="video">
      <h1>Video</h1>
      <ul className="grid">
        {videos &&
          videos.map(({id, snippet = {}}: any) => {
            const {title, thumbnails = {}, resourceId = {}}: any = snippet;
            const {medium} = thumbnails;
            return (
              <li key={id} className="item">
                <a
                  href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                  target="_blank"
                  className="link"
                >
                  <p>
                    <img
                      width={medium.width}
                      height={medium.height}
                      src={medium.url}
                      alt=""
                    />
                  </p>
                  <h3>{title}</h3>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
