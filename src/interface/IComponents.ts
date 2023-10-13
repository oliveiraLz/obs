// Interfaces de todos os componentes criados a mão
import React from "react";

export interface INotFound {
  link: string;
  text: string;
}

export interface ITitle {
  title: string;
  children: React.ReactNode;
}

export interface IDecoded {
  name: string;
  email: string;
}
