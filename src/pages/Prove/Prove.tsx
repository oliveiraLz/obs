import React from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";

import { SideMenu } from "../../components/SideMenu/SideMenu";
import { Header } from "../../components/Header/Header";

export const Prove: React.FC = () => {
  const items: MenuItem[] = [
    { label: "Computer" },
    { label: "Notebook" },
    { label: "Accessories" },
    { label: "Backpacks" },
    { label: "Item" },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: "https:///primereact" };

  return (
    <div className="container-prove-page">
      <SideMenu />

      <main className="container-main-prove-page">
        <Header title="Prove">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>
        <section className="section-main">
          <div>
            <TabView>
              <TabPanel header="Header I">
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </TabPanel>
              <TabPanel header="Texto II">
                <p className="m-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed
                  quia non numquam eius modi.
                </p>
              </TabPanel>
              <TabPanel header="Header III">
                <p className="m-0">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                  provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                  fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis
                  est eligendi optio cumque nihil impedit quo minus.
                </p>
              </TabPanel>
            </TabView>
          </div>
        </section>
      </main>
    </div>
  );
};
