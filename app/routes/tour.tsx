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
        <table className="tour-table">
          <tbody>
            {tourDates.map((item: any, key: number) => (
              <tr key={key}>
                <td>{parseDate(item.date)}</td>
                <td>
                  {item.venue}, {item.city}
                </td>
                <td>
                  {item.ticketSaleUrl && (
                    <a
                      href={item.ticketSaleUrl}
                      target="_blank"
                      className="button button--primary"
                    >
                      Koop Kaarten
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {festivalDates.length > 0 && (
        <>
          <h2>Festivals</h2>
          <table className="tour-table">
            <tbody>
              {festivalDates.map((item: any, key: number) => (
                <tr key={key}>
                  <td>{parseDate(item.date)}</td>
                  <td>
                    {item.festival}, {item.city}
                  </td>
                  <td>
                    {item.ticketSaleUrl && (
                      <a
                        href={item.ticketSaleUrl}
                        target="_blank"
                        className="button button--primary"
                      >
                        Koop Kaarten
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
