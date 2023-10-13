import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import { IRowUsers, IUserDataTable } from "../../interface/IDataTable";

interface IDataUser {
  dataUser: IUserDataTable[] | undefined;
}

export const DataTableUsers: React.FC<IDataUser> = ({ dataUser }) => {
  const navigate = useNavigate();

  const editBodyTemplate = useCallback(
    (rowData: IRowUsers) => {
      return (
        <Button
          icon="pi pi-pencil"
          severity="info"
          size="small"
          text
          onClick={() => navigate(`/users/${rowData.id}`)}
        />
      );
    },
    [navigate]
  );

  const cardBodyTemplate = useCallback(() => {
    return <Tag severity="success" value="Contratado" />;
  }, []);

  /* const getDataUsers = useCallback(() => {
    api.get<IUserDataTable[]>("/user").then(({ data }) => {
      setUsers(data);
    });
    setDataChanged(true);
  }, []); 

  useEffect(() => {
    getDataUsers();
    setDataChanged(false);
  }, [dataChanged]); */

  return (
    <div className="container-data-">
      <DataTable
        paginator
        selectionMode="single"
        size="small"
        stripedRows
        value={dataUser}
        rows={10}
        className="p-datatable"
        tableClassName="p-data-table-borderless"
      >
        <Column
          field="name"
          header="Nome"
          sortable
          style={{ width: "25%", fontSize: "0.9rem" }}
          className="p-column-title"
          filterHeader
          headerStyle={{
            height: "7vh",
            background: "#1b1f2e",
            color: "#fff",
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        />
        <Column
          field="email"
          header="Email"
          sortable
          headerClassName="title-center"
          className="p-column-title"
          style={{ width: "25%", fontSize: "0.9rem" }}
          headerStyle={{ height: "7vh", background: "#1b1f2e", color: "#fff", fontSize: "1.1rem", textAlign: "center" }}
        />
        <Column
          header="Status"
          sortable
          headerClassName="title-center"
          body={cardBodyTemplate}
          style={{ width: "25%", fontSize: "1rem" }}
          headerStyle={{ height: "7vh", background: "#1b1f2e", color: "#fff", fontSize: "1.1rem", textAlign: "center" }}
        />

        <Column
          body={editBodyTemplate}
          bodyStyle={{ textAlign: "center" }}
          style={{ width: "25%", fontSize: "1rem" }}
          headerStyle={{ height: "7vh", background: "#1b1f2e", color: "#fff", fontSize: "1.1rem" }}
        />
      </DataTable>
    </div>
  );
};
