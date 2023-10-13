import React, { useCallback } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

import { accessLevelMap } from "../../interface/IDataTableProps";
import { FeaturesDataTable, RolesDataTable } from "../../interface/IDataTable";

export const DataTablePermissions = ({
  roleData,
  selectedRoles,
  checkRoles,
  selectedOptions,
  checkOptions,
}: {
  roleData: FeaturesDataTable[] | undefined;
  selectedRoles: FeaturesDataTable[] | undefined;
  selectedOptions: { [id: string]: string[] };
  // eslint-disable-next-line no-unused-vars
  checkOptions: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  checkRoles: (e: any) => void;
}) => {
  const dropdownUserBodyTemplate = useCallback(
    (rowData: any) => {
      const options = rowData.roles.map((r: RolesDataTable) => {
        const short = accessLevelMap[r.short];
        return { ...r, short };
      });

      return (
        <MultiSelect
          value={selectedOptions[rowData.id]}
          onChange={(e: MultiSelectChangeEvent) => {
            checkOptions({ ...selectedOptions, [rowData.id]: e.value });
          }}
          optionValue="id"
          optionLabel="short.label"
          key="id"
          options={options}
          placeholder="Selecione"
          maxSelectedLabels={3}
          className="w-full md:w-20rem"
        />
      );
    },
    [checkOptions, selectedOptions]
  );

  return (
    <DataTable
      emptyMessage="Nenhuma permissão encontrada!"
      selection={selectedRoles}
      paginator
      selectionMode="multiple"
      onSelectionChange={(e: any) => {
        checkRoles(e);
      }}
      compareSelectionBy="deepEquals"
      dataKey="name"
      size="small"
      stripedRows
      value={roleData}
      rows={10}
      className="p-datatable"
    >
      <Column
        header="Permissão"
        field="name"
        sortable
        style={{ width: "30%", fontSize: "0.9rem" }}
        className="p-column-title"
        filterHeader
        headerStyle={{ height: "6vh", background: "#1b1f2e", color: "#fff", fontSize: "1rem" }}
      />
      <Column
        field="description"
        header="Descrição"
        sortable
        className="p-column-title"
        style={{ width: "35%", fontSize: "0.9rem" }}
        headerStyle={{ height: "6vh", background: "#1b1f2e", color: "#fff", fontSize: "1rem" }}
      />

      <Column
        header="Nível de acesso"
        body={dropdownUserBodyTemplate}
        style={{ width: "15%", fontSize: "1rem" }}
        headerStyle={{ height: "6vh", background: "#1b1f2e", color: "#fff", fontSize: "1rem" }}
      />
    </DataTable>
  );
};
