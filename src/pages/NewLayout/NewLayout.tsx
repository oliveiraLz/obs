import React, { useCallback, useEffect, useState } from "react";
import { NewHeader } from "../../components/NewHeader/NewHeader";
import { DataTableUsers } from "../../components/DataTableUsers/DataTableUsers";
import { IUserDataTable } from "../../interface/IDataTable";
import { api } from "../../service/api";

export const NewLayout: React.FC = () => {
  const [dataUsers, setDataUsers] = useState<IUserDataTable[]>([]);
  const [dataChanged, setDataChanged] = useState<boolean>(false);

  const getDataUsers = useCallback(() => {
    api.get<IUserDataTable[]>("/user").then(({ data }) => {
      setDataUsers(data);
    });
    setDataChanged(true);
  }, []);

  useEffect(() => {
    getDataUsers();
    setDataChanged(false);
  }, [dataChanged]);

  return (
    <div className="container-page">
      <NewHeader title="Usuários" />

      <main className="container-main">
        <DataTableUsers dataUser={dataUsers} />
      </main>
    </div>
  );
};
