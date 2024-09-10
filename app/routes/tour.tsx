import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {client} from '~/lib/contentful';

export const meta: MetaFunction = () => {
  return [{title: 'HANG YOUTH | TOUR'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const tourDates = await client.getTourDates(context);
  const festivalDates = await client.getFestivalDates(context);
  return defer({
    tourDates,
    festivalDates,
  });
}

const parseDate = (date: string) => {
  const [year, month, day] = date.split('T')[0].split('-');
  const months = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ];

  return `${day} ${months[parseInt(month) - 1]} ‘${year.substring(2)}`;
};

export default function Tour() {
  const {tourDates, festivalDates} = useLoaderData<typeof loader>();

  return (
    <div className="tour">
      <h1>Tour</h1>
      {tourDates.length === 0 ? (
        <p>Er zijn momenteel geen tourdata bekend.</p>
      ) : (
        <div className="tour-dates">
          {tourDates.map((item: any) => (
            <div key={item.city + item.date} className="tour-date">
              <div className="tour-date__date">{parseDate(item.date)}</div>
              <div className="tour-date__location">
                {item.venue}, {item.city}
              </div>
              <div className="tour-date__cta">
                {item.ticketSaleUrl && (
                  <a
                    href={item.ticketSaleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--primary"
                  >
                    {item.soldOut ? 'Uitverkocht' : 'Koop Kaarten'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {festivalDates.length > 0 && (
        <>
          <h2>Festivals</h2>
          <div className="tour-dates">
            {festivalDates.map((item: any) => (
              <div key={item.city + item.date} className="tour-date">
                <div className="tour-date__date">{parseDate(item.date)}</div>
                <div className="tour-date__location">
                  {item.festival}, {item.city}
                </div>
                <div className="tour-date__cta">
                  {item.ticketSaleUrl && (
                    <a
                      href={item.ticketSaleUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button button--primary"
                    >
                      {item.soldOut ? 'Uitverkocht' : 'Koop Kaarten'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
