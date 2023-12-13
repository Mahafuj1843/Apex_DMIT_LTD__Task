"use client"

import { setCompanys, setFrom, setPageNo, setTo, setTotalCompanys, setloading } from "@/redux/state/companySlice";
import { store, useAppSelector } from "@/redux/store/store";
import axios from "axios";
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";

interface Company {
  company_name: string,
  company_phone: string | null,
  address1: string | null,
  address2: string | null,
  city: string | null;
  company_status: string | null
}

export default function Home() {

  let [search, setSearch] = useState<string>("");
  let [status, setStatus] = useState<string>("");

  let Companys: Company[] = useAppSelector((state) => state.company.companys);
  let TotalCompanys = useAppSelector((state) => state.company.totalCompanys);
  const loading = useAppSelector((state) => state.company.loading);
  const pageNo = useAppSelector((state) => state.company.pageNo);
  const from = useAppSelector((state) => state.company.from);
  const to = useAppSelector((state) => state.company.to);

  const companyList = async () => {
    try {
      store.dispatch(setloading(true))
      let url = `http://139.59.35.127/production/propsoft-api/public/api/get-all-companys?company_status=${status}&company_name=${search}&page=${pageNo}`
      const result = await axios.get(url);

      if (result.status === 200) {
        store.dispatch(setloading(false))
        if (result.data.companys.data.length > 0) {
          store.dispatch(setCompanys(result.data.companys.data))
          store.dispatch(setTotalCompanys(result.data.companys.total))
          store.dispatch(setFrom(result.data.companys.from))
          store.dispatch(setTo(result.data.companys.to))
        } else {
          store.dispatch(setCompanys([]))
          store.dispatch(setTotalCompanys(0))
          store.dispatch(setFrom(0))
          store.dispatch(setTo(0))
        }
      } else {
        store.dispatch(setloading(false))
        console.log("Something went wrong.")
      }
    } catch (error) {
      store.dispatch(setloading(false))
      console.log(error)
    }
  }

  let check = (s: string | null): string => {
    return s?.length ? s : "N/A";
  }

  let checkStatus = (s: string | null): string => {
    return s === '0' ? "Pending" : s === '1' ? 'In-progress' : "Complete";
  }

  const handlePageClick = async (e: any) => {
    store.dispatch(setPageNo(e.selected + 1))
  };

  const searchKeywordOnChange = async (e: any) => {
    setSearch(e.target.value)
    if ((e.target.value).length === 0) {
      setSearch("")
      store.dispatch(setPageNo(1))
      await companyList()
    }
  }

  useEffect(() => {
    companyList()
  }, [pageNo, status])

  return (
    <div className="w-[80%] overflow-x-auto mx-auto shadow-md px-5 mt-5">
      <h2 className="text-center my-3 text-lg font-semibold">Companys</h2>
      <div className="relative w-full">
        <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3 md:gap-0 py-3'>
          <div className=' flex items-center justify-center text-center'>
            <span className='font-bold text-gray-500 text-base'>Status :</span>
            <select
              onChange={(e) => setStatus(e.target.value)}
              id="status" className="bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5">
              <option selected={status === ""} value="">ALL</option>
              <option selected={status === "Pending"} value="0">Pending</option>
              <option selected={status === 'In-progress'} value="1">In-progress</option>
              <option selected={status === "Complete"} value="2">Complete</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="w-auto lg:w-full border-md">
              <input type="text" onChange={(e) => searchKeywordOnChange(e)} id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C1654] focus:border-[#2C1654] block w-[250px] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company Name..." required />
            </div>
            <button onClick={(e) => companyList()} className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-[#2C1654] rounded-lg border border-[#2C1654] hover:bg-[#422180] focus:ring-4 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="w-5 h-5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className='hidden md:block'>Search</span>
            </button>
          </div>
        </div>
        {
          loading ? <Loader />
            :
            TotalCompanys ?
              <table className="w-full text-sm text-center rtl:text-right text-gray-500">
                <thead className="text-xs text-black uppercase bg-gray-300 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Company name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address 1
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address 2
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Companys?.map((company, i) => (
                      <tr key={i} className="odd:bg-white even:bg-gray-200 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {company.company_name}
                        </th>
                        <td className="px-6 py-2 border-s border-gray-400">
                          {check(company.company_phone)}
                        </td>
                        <td className="px-6 py-2 border-s border-gray-400">
                          {check(company.address1)}
                        </td>
                        <td className="px-6 py-2 border-s border-gray-400">
                          {check(company.address2)}
                        </td>
                        <td className="px-6 py-2 border-s border-gray-400">
                          {check(company.city)}
                        </td>
                        <td className={`px-6 py-2 border-s border-gray-400`}>
                          {checkStatus(company.company_status)}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              :
              <NotFound />
        }
      </div>

      <>
        {
          Companys?.length &&
          <div className='w-full flex items-center justify-between py-8 '>
            <span className="text-sm">{from+" - "+to} of {TotalCompanys}</span>
            <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
              <ReactPaginate className='pagination gap-2'
                previousLabel="<"
                nextLabel=">"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={Math.ceil(TotalCompanys / 5)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
              />
            </nav>
          </div>
        }
      </>
    </div>
  )
}
