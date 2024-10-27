import { create } from "zustand";
import { apiClient } from "../../util/rest-client";
import { FetchPolicyType } from "../constants";
import { IStore } from "../interfaces";
import { IColumnsActions, IColumnsState } from "./interfaces";

// TODO: поправить, вынести запрос в сервис
export const useColumnsStore = create<IStore<IColumnsState, IColumnsActions>>(
  (set, get) => ({
    data: {
      loading: false,
      data: undefined,
      error: undefined,
    },
    actions: {
      getColumns: async (fetchPolicyType = FetchPolicyType.CACHE_FIRST) => {
        if (
          (fetchPolicyType === FetchPolicyType.CACHE_FIRST &&
            !get().data.data) ||
          fetchPolicyType === FetchPolicyType.NETWORK_ONLY
        ) {
          set((state) => ({
            ...state,
            data: { ...state.data, loading: true },
          }));
          try {
            const columns = await apiClient.get(
              "/api/authorized/board/getColumns",
            );
            set((state) => ({
              ...state,
              data: { ...state.data, data: columns.data, loading: false },
            }));
          } catch (e: any) {
            set((state) => ({
              ...state,
              data: { ...state.data, loading: false, error: e?.message },
            }));
          }
        }
      },
      updateColumns: async (values) => {
        try {
          await apiClient.put("/api/authorized/board/updateColumn", values);
          set((state) => {
            const { id, ...rest } = values;
            const updateColumnsData = state.data.data?.map((item) => {
              if (item._id === id) {
                return { ...item, ...rest };
              }
              return item;
            });

            return {
              ...state,
              data: { ...state.data, data: updateColumnsData, loading: false },
            };
          });
        } catch (e: any) {
          set((state) => ({
            ...state,
            data: { ...state.data, loading: false, error: e?.message },
          }));
        }
      },
    },
  }),
);
