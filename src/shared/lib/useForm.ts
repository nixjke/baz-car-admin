// Удаляем общий хук - лучше создавать отдельные хуки для каждой формы
// Пример использования в компонентах:
// 
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { carSchema } from './schemas';
// 
// const form = useForm({
//   resolver: zodResolver(carSchema),
//   mode: 'onChange',
//   defaultValues: { ... }
// });
