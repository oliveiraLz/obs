import React, { createContext, useCallback, useContext, useMemo, useRef } from "react";
import { Toast as PrimeToast } from "primereact/toast";
import { AxiosError } from "axios";
import { IAppError } from "../../errors/AppErrorInterfaces";
import { useToast } from "./toast";

interface ErrorContextData {
  // eslint-disable-next-line no-unused-vars
  handleError(errorProps: ErrorProps): void;
}

export interface ErrorProps {
  error: Error | AxiosError | any;
  action: string;
  knownErrors: IAppError[];
}

export interface ProblemaCampo {
  nome: string;
  mensagem: string;
}

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useRef<PrimeToast>(null);
  const { showToast } = useToast();

  const showErrorToast = useCallback(
    ({ message, title }: IAppError, action: string) => {
      showToast({
        type: "warn",
        title: `${title || "Ops..."}`,
        description: `Não foi possível ${action}. ${message}`,
      });
    },
    [showToast]
  );

  const handleError = useCallback(
    ({ error, action, knownErrors }: ErrorProps) => {
      if (error && error.response && error.response.data.message) {
        const errorCode: string = error.response.data.message;

        const errorFound = knownErrors.find((err) => errorCode.includes(err.code));
        if (errorFound) {
          showErrorToast(errorFound, action);
          return;
        }
      }
      // eslint-disable-next-line no-console
      console.error("erro:", error);
      showToast({
        type: "error",
        title: `Algo deu errado ao ${action}.`,
        description: "Tente novamente ou contate nosso time de suporte para solicitar ajuda.",
      });
      // eslint-disable-next-line no-console
      console.error("erro:", error);
    },
    [showErrorToast, showToast]
  );

  const handleErrorProviderMemo = useMemo(() => {
    return { handleError };
  }, [handleError]);

  return (
    <ErrorContext.Provider value={handleErrorProviderMemo}>
      <PrimeToast ref={toast} />
      {children}
    </ErrorContext.Provider>
  );
};

function useError(): ErrorContextData {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError must be used within a ErrorProvider");
  }

  return context;
}

export { ErrorProvider, useError };
