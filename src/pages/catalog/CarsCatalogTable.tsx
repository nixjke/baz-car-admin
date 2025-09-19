import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Box, Image } from "@chakra-ui/react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import { type Car, CarResponseSchema } from "@/shared/lib";

ModuleRegistry.registerModules([AllCommunityModule]);

export const CarsCatalogTable = () => {
  const [rowData, setRowData] = useState<Car[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const localeText = {
    pageSizeSelectorLabel: "Кол-во на странице",
    page: "Страница",
    to: "до",
    of: "из",
    nextPage: "Следующая",
    lastPage: "Последняя",
    firstPage: "Первая",
    previousPage: "Предыдущая",
    loadingOoo: "Загрузка...",
    noRowsToShow: "Нет данных для отображения",
  };

  const russianComparator = (valueA: string, valueB: string) => {
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return -1;
    if (valueB == null) return 1;

    return valueA.localeCompare(valueB, "ru");
  };

  const carCardRenderer = (params: ICellRendererParams<Car>) => {
    const car = params.data;
    if (!car) return null;

    return (
      <Box>
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          objectFit="cover"
          borderRadius="md"
          mr={3}
        />
      </Box>
    );
  };

  const [columnDefs] = useState<ColDef<Car>[]>([
    {
      headerName: "Автомобили",
      cellRenderer: carCardRenderer,
      autoHeight: true,
      resizable: false,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Цена",
      valueFormatter: (params: { value: number }) =>
        `${params.value.toLocaleString("ru-RU")} ₽`,
      width: 130,
      sortable: true,
    },
    {
      field: "brand",
      headerName: "Марка",
      width: 120,
      sortable: true,
      comparator: russianComparator,
    },
    {
      field: "model",
      headerName: "Модель",
      width: 150,
      sortable: true,
      comparator: russianComparator,
    },
    {
      field: "engineType",
      headerName: "Двигатель",
      width: 120,
      sortable: true,
      comparator: russianComparator,
    },
    {
      field: "power",
      headerName: "Мощность",
      valueFormatter: (params: { value: number }) => `${params.value} л.с.`,
      width: 100,
      sortable: true,
    },
    {
      field: "seats",
      headerName: "Места",
      width: 80,
      sortable: true,
    },
    {
      field: "maxSpeed",
      headerName: "Макс. скорость",
      valueFormatter: (params: { value: number }) => `${params.value} км/ч`,
      width: 130,
      sortable: true,
    },
    {
      field: "acceleration",
      headerName: "Разгон 0-100",
      valueFormatter: (params: { value: number }) => `${params.value} сек`,
      width: 110,
      sortable: true,
    },
    {
      field: "trunkVolume",
      headerName: "Багажник",
      valueFormatter: (params: { value: number }) => `${params.value} л`,
      width: 100,
      sortable: true,
    },
    {
      field: "range",
      headerName: "Запас хода",
      valueFormatter: (params: { value: number }) => `${params.value} км`,
      width: 110,
      sortable: true,
    },
    {
      field: "fuelConsumption",
      headerName: "Расход",
      valueFormatter: (params: { value: number }) => `${params.value} л/100км`,
      width: 100,
      sortable: true,
    },
    {
      field: "inStock",
      headerName: "В наличии",
      cellRenderer: (params: { value: boolean }) =>
        params.value ? "В наличии" : "Нет в наличии",
      width: 120,
      sortable: true,
    },
  ]);

  const validateAndSetData = (data: unknown[]) => {
    const errors: string[] = [];
    const validatedData: Car[] = [];

    data.forEach((item, index) => {
      const result = CarResponseSchema.safeParse(item);

      if (result.success) {
        validatedData.push(result.data);
      } else {
        const errorMessages = result.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`,
        );
        errors.push(
          `Ошибка в элементе ${index + 1}: ${errorMessages.join(", ")}`,
        );
      }
    });

    setValidationErrors(errors);
    setRowData(validatedData);

    if (errors.length > 0) {
      console.warn("Обнаружены ошибки валидации:", errors);
    }
  };

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        image:
          "https://img.indianautosblog.com/2011/08/European-Toyota-Camry.jpg",
        brand: "Тойота",
        model: "Камри",
        price: 2500000,
        engineType: "Бензин",
        inStock: true,
        seats: 5,
        maxSpeed: 220,
        acceleration: 8.2,
        power: 249,
        trunkVolume: 524,
        range: 850,
        fuelConsumption: 7.8,
      },
      {
        id: 2,
        image:
          "https://autofakty.com/wp-content/uploads/2018/03/Audi-A6-2018-2019-1.jpg",
        brand: "Audi",
        model: "A6",
        price: 3500000,
        engineType: "Дизель",
        inStock: false,
        seats: 5,
        maxSpeed: 250,
        acceleration: 6.8,
        power: 286,
        trunkVolume: 530,
        range: 900,
        fuelConsumption: 6.2,
      },
    ];

    validateAndSetData(mockData);
  }, []);

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  };

  return (
    <Box className="ag-theme-alpine" style={{ padding: "20px" }}>
      {validationErrors.length > 0 && (
        <Box
          bg="red.50"
          border="1px"
          borderColor="red.200"
          borderRadius="md"
          p={3}
          mb={4}
          color="red.800"
        >
          <Box fontWeight="bold" mb={2}>
            Ошибки валидации:
          </Box>
          {validationErrors.map((error, index) => (
            <Box key={index} fontSize="sm">
              • {error}
            </Box>
          ))}
        </Box>
      )}

      <Box className="ag-theme-alpine" minH="80vh">
        <AgGridReact<Car>
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={5}
          domLayout="autoHeight"
          localeText={localeText}
          enableCellTextSelection={true}
        />
      </Box>
    </Box>
  );
};
