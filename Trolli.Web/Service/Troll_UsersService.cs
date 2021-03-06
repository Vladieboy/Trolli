using Trolli.Data;
using Trolli.Data.Providers;
using Trolli.Models.Requests;
using Trolli.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Trolli.Services;
using Trolli.Models;

namespace Trolli.Web.Service
{

    public class Troll_UsersService
    {
        private IAuthenticationService _authenticationService;
        private readonly IDataProvider _dataProvider;

        public Troll_UsersService(IDataProvider dataProvider, IAuthenticationService authSerice)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;

        }

        public TrolliUsers GetById(int Id)
        {

            TrolliUsers trolliData = null;
            string procName = "[dbo].[Troll_Users_SelectById]";
            _dataProvider.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", Id);

            }
           , singleRecordMapper: delegate (IDataReader reader, short set)
           {
               trolliData = new TrolliUsers();

               int startingIndex = 0;
               trolliData.Id = reader.GetSafeInt32(startingIndex++);
               trolliData.Password = reader.GetSafeString(startingIndex++);
               trolliData.Username = reader.GetSafeString(startingIndex++);



           });

            return trolliData;

        }

        public int Insert(Troll_UserAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Trolli_User_Insert]";

            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@Password", model.Password);
                    sqlParams.AddWithValue("@UserName", model.UserName);

                    SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idParameter.Direction = System.Data.ParameterDirection.Output;

                    sqlParams.Add(idParameter);
                }, returnParameters: delegate (SqlParameterCollection sqlParams)
                {
                    Int32.TryParse(sqlParams["@Id"].Value.ToString(), out id);
                }
                );
            return id;
        }


        public void Update(Troll_UserUpdateRequest data)
        {
            string storeProc = "[dbo].[Trolli_User_Update]";

            _dataProvider.ExecuteNonQuery(storeProc, delegate (SqlParameterCollection sqlParams)
            {
                sqlParams.AddWithValue("@Id", data.Id);
                sqlParams.AddWithValue("@UserName", data.UserName);
                sqlParams.AddWithValue("@Password", data.Password);
            });
        }
        public void Delete(int Id)
        {
            string storeProc = "[dbo].[Trolli_User_Delete]";

            _dataProvider.ExecuteNonQuery(storeProc,
                delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@id", Id);
                });

        }

        public bool LogIn(string userName, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = SelectByUserName(userName, password);

            if (response != null)
            {
                _authenticationService.LogIn(response);
                isSuccessful = true;
            }


            return isSuccessful;

        }

        public void LogOut()
        {
            _authenticationService.LogOut();

        }

        private UserBase SelectByUserName(string userName, string password)
        {
            string PasswordRead = "";
            UserBase authUser = null;
            TrolliUsers trolliData = null;
            string procName = "[dbo].[Troll_Users_SelectByUserName]";
            _dataProvider.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@UserName", userName);

            }
           , singleRecordMapper: delegate (IDataReader reader, short set)
           {
               trolliData = new TrolliUsers();
               int startingIndex = 0;
               authUser = new UserBase
               {
                   Id = reader.GetSafeInt32(startingIndex++),
                   Name = reader.GetSafeString(startingIndex++)
               };
               PasswordRead = reader.GetSafeString(startingIndex++);
           });
            if (PasswordRead == password)
            {
                return authUser;
            }
            return null;
        }

    }
}
