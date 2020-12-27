import React from 'react';
import { ContextData } from '../types/dataTypes';

export const DataContext = React.createContext<ContextData | null>(null);