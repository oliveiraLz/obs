/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

import { Header } from "../../components/Header/Header";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { DataTablePermissions } from "../../components/DataTablePermissions/DataTablePermissions";

import { useRequests } from "../../shared/hooks/useRequests";
import { api } from "../../service/api";

import { FeaturesDataTable, IPermissionsDataTable } from "../../interface/IDataTable";

interface RolesFindOne {
  id: string;
  short: string;
}

interface FeatureFindOne {
  id: string;
  name: string;
  description: string;
  roles: RolesFindOne[];
}

interface GroupFindOne {
  id: string;
  name: string;
  features: FeatureFindOne[];
}

export const EditGroup: React.FC = () => {
  const [permissions, setPermissions] = useState<IPermissionsDataTable[]>([]);
  const [roles, setRoles] = useState<FeaturesDataTable[]>([]);
  const [selectedUserOptions, setSelectedUserOptions] = useState<{ [id: string]: string[] }>({});

  const token = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token!);

  const navigate = useNavigate();

  const { id } = useParams();
  const { putGroupRequest } = useRequests();

  const items: MenuItem[] = [
    { label: "Grupos", command: () => navigate("/groups") },
    { label: "Adicionar permissões" },
  ];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  const getDataPermissions = useCallback(() => {
    api.get<IPermissionsDataTable[]>("/application-group").then(({ data }) => {
      setPermissions(data);
    });
  }, []);

  const getGroupRoles = useCallback(() => {
    api.get<GroupFindOne>(`/groups/${id}`).then(({ data }) => {
      let featuresMap: { [id: string]: string[] } = {};
      data.features.forEach((f) => {
        featuresMap = { ...featuresMap, [f.id]: [] };
      });

      const keys = Object.keys(featuresMap);
      for (const k of keys) {
        const f = data.features.find((fe) => fe.id === k);

        if (f) {
          featuresMap = { ...featuresMap, ...{ [k]: f.roles.map((r) => r.id) } };
        }
      }

      setSelectedUserOptions(featuresMap);
    });
  }, [id]);

  const onSubmit = useCallback(
    (e: any) => {
      const rolesPost: any[] = [];
      const keys = Object.keys(selectedUserOptions);
      keys.forEach((k) => {
        rolesPost.push(selectedUserOptions[k]);
      });
      e.preventDefault();
      putGroupRequest({
        role: rolesPost.flatMap((r) => r),
      });
    },
    [putGroupRequest, selectedUserOptions]
  );

  useEffect(() => {
    getDataPermissions();
    getGroupRoles();
  }, [getDataPermissions, getGroupRoles]);

  return (
    <section className="container-editgroup-page">
      <SideMenu />
      <main className="container-main-editgroup-page">
        <Header title="Adicionar permissões">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <div className="bar-group-buttons-action">
            <div className="container-buttons">
              <Button
                label="Voltar"
                icon="pi pi-arrow-left"
                severity="info"
                outlined
                style={{ marginBottom: "0.2%" }}
                onClick={() => navigate("/groups")}
                size="small"
              />
              {decoded.roles.includes("GRUPO_WRITE") ? (
                <Button
                  label="Salvar"
                  icon="pi pi-save"
                  severity="info"
                  style={{ marginBottom: "0.2%" }}
                  onClick={onSubmit}
                  size="small"
                />
              ) : (
                ""
              )}
            </div>
            <Divider />
          </div>
          <div>
            <TabView>
              {permissions.map(({ name, features }) => (
                <TabPanel key={name} header={name} className="p-tabview">
                  <DataTablePermissions
                    roleData={features}
                    selectedRoles={roles}
                    checkRoles={(e: any) => setRoles(e.value)}
                    selectedOptions={selectedUserOptions}
                    checkOptions={(e: any) => {
                      setSelectedUserOptions(e);
                    }}
                  />
                </TabPanel>
              ))}
            </TabView>
          </div>
        </section>
      </main>
    </section>
  );
};
