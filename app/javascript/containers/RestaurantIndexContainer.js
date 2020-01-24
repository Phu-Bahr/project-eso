import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  const firstPageRows = rows.slice(0, 20);
  // Render the UI for your table
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <p className="panel">
            Showing the first 20 results of {rows.length} rows. Click on column
            names to sort.
          </p>
        </tbody>
      </table>
      <br />
    </div>
  );
}

// how to fetch my data with hooks.
const RestaurantIndexContainer = () => {
  const [data1, setData] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/v1/restaurants")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        console.log("body", body.restaurants[0].UserName);

        setData(body.restaurants[0].UserRestaurants);
        setUser(body.restaurants[0].UserName);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Your Restaurants",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Price",
            accessor: "price"
          },
          {
            Header: "Rating",
            accessor: "rating"
          },
          {
            Header: "Street",
            accessor: "street"
          },
          {
            Header: "City",
            accessor: "city"
          },
          {
            Header: "State",
            accessor: "state"
          },
          {
            Header: "Zip",
            accessor: "zip"
          },
          {
            Header: "Last Chosen",
            accessor: "updated_at"
          },
          {
            Header: "Category",
            accessor: "yelpcategory"
          }
        ]
      }
    ],
    []
  );

  const data = data1;

  return (
    <div>
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
    </div>
  );
};

export default RestaurantIndexContainer;
