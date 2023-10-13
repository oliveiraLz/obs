/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Column } from "primereact/column";

import jwtDecode from "jwt-decode";

import { useToast } from "../../shared/hooks/toast";

import { IGroupDataTable, IRowGroups } from "../../interface/IDataTable";
import { api } from "../../service/api";

interface IDecoded {
  roles: string[];
}

interface IDataGroup {
  dataGroup: IGroupDataTable[];
}

export const DataTableGroups: React.FC<IDataGroup> = ({ dataGroup }) => {
  const [dataChanged, setDataChanged] = useState<boolean>(false);

  const token = localStorage.getItem("authToken");

  const decoded: IDecoded = jwtDecode<IDecoded>(token!);

  const navigate = useNavigate();

  const { showToast } = useToast();

  const deleteDialog = (rowData: any) => {
    confirmDialog({
      message: "Deseja excluir este grupo?",
      header: "Exclusão",
      acceptLabel: "Sim",
      rejectLabel: "Não",

      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept() {
        const apiDelete = async () => {
          await api.delete(`/groups/${rowData.id}`).then(() => {
            showToast({
              title: "Sucesso",
              type: "success",
              description: "Grupo deletado!",
            });
          });
        };
        setDataChanged(true);
        apiDelete();
      },
    });
  };

  const editBodyTemplate = useCallback(
    (rowData: IRowGroups) => {
      return (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {decoded.roles.includes("GRUPO_READ") ? (
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="info"
              text
              onClick={() => navigate(`/groups/${rowData.id}`)}
            />
          ) : (
            ""
          )}

          {decoded.roles.includes("GRUPO_DELETE") ? (
            <Button icon="pi pi-trash" size="small" severity="danger" text onClick={() => deleteDialog(rowData)} />
          ) : (
            ""
          )}
        </div>
      );
    },
    [deleteDialog, navigate]
  );

  /* const getDataGroups = useCallback(() => {
    api.get<IGroupDataTable[]>("/groups").then(({ data }) => {
      setGroups(data);
    });
    setDataChanged(true);
  }, []); */

  useEffect(() => {
    // getDataGroups();
    setDataChanged(false);
  }, [dataChanged]);

  return (
    <div className="container-data-group">
      <DataTable
        paginator
        selectionMode="single"
        size="small"
        stripedRows
        value={dataGroup}
        rows={10}
        className="p=datatable"
      >
        <Column
          style={{ fontSize: "0.9rem", width: "3%" }}
          headerStyle={{ height: "7vh", background: "#1b1f2e", color: "#fff" }}
          className="p-column-title"
        />

        <Column
          field="name"
          header="Grupos"
          style={{ fontSize: "0.9rem", width: "40%" }}
          headerStyle={{ height: "7vh", background: "#1b1f2e", color: "#fff", fontSize: "1.1rem" }}
          className="p-column-title"
        />
        <Column
          field="permissions.name"
          header="Permissões"
          style={{ fontSize: "1rem", width: "40%" }}
          headerStyle={{ height: "7vh", background: "#1b1f2e", color: "#fff", fontSize: "1.1rem" }}
          className="p-column-title"
        />

        <Column
          body={editBodyTemplate}
          style={{ width: "25%" }}
          headerStyle={{ height: "7vh", background: "#1b1f2e", color: "#fff" }}
        />
      </DataTable>
    </div>
  );
};
