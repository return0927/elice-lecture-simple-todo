import axios from 'axios';

const appId = '' || process.env.REACT_APP_AIRTABLE_APP_ID;
const tableName = '' || process.env.REACT_APP_AIRTABLE_TABLE_NAME;
const apiKey = '' || process.env.REACT_APP_AIRTABLE_KEY;

/* eslint-disable */
export default {
  setup: () => {
    axios.defaults.baseURL = `https://api.airtable.com/v0/${appId}/${tableName}`;
    axios.interceptors.request.use(async (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${apiKey}`;
      }
      config.headers['Content-Type'] = 'application/json';

      return config;
    });
  },
};

// export default async (req, res) => {
//     try {
//         if (req.method == "POST") {
//             const post = await axios.post('/', {
//                 records: [req.body],
//             });
//             res.status(200).json({ success: true, data: post.data });
//         } else if (req.method == "PATCH") {

//         } else if (req.method == "DELETE") {

//         } else {
//             const list = await axios.get("/?maxRecords=100&view=raw");

//             const records = list.data.records;
//             res.status(200).json({ records });
//         }
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).json({ error: true });
//     }
// };
