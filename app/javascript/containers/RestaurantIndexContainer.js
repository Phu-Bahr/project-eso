import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import makeData from "./makeData";
import MakeData1 from "./makeData1";

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
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// how to fetch my data with hooks.
const RestaurantIndexContainer = () => {
  const [data1, setData] = useState({});

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
        setData(body.restaurants[0].UserRestaurants);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Username Restaurants",
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

  const data = React.useMemo(() => [data1], []);
  console.log(data1);

  return (
    <div>
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
    </div>
  );
};

export default RestaurantIndexContainer;
