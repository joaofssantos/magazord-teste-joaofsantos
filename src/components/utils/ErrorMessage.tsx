type ErrorMessageProps = {
  title?: string;
  message: string;
  retry?: () => void;
};

export const ErrorMessage = ({
  title = "Erro",
  message,
  retry,
}: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md">
        <h3 className="text-lg font-semibold text-dark mb-2">{title}</h3>
        <p className="text-short text-light-dark mb-4">{message}</p>
        {retry && (
          <button
            onClick={retry}
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-opacity-90 transition-colors"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
};

export const EmptyState = ({
  message = "Nenhum resultado encontrado",
}: {
  message?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <p className="text-short text-light-dark">{message}</p>
    </div>
  );
};
