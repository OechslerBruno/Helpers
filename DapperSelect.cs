namespace Project.Dapper.Repositories
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {

	public List<ProjectEntity> GetReportData(ProjectEntity projectEntity)
        {
            StringBuilder query = new StringBuilder();
            Dictionary<string, object> parameters = new Dictionary<string, object>();
            List<string> whereConditions = new List<string>();

            using (IDbConnection db = new DBConnection(ConnectionString))
            {
                query.AppendFormat(@"
                                SELECT <fildsList> FROM {0}.Tab", Schema);

                if (!string.IsNullOrEmpty(projectEntity.FildA))
                {
                    parameters.Add("fieldA", projectEntity.FildA);
                    whereConditions.Add(" Tab.ColumnA = @fieldA");
                }

                if (projectEntity.FildB == 1)
                {
                    parameters.Add("fildB", "S");
                    whereConditions.Add(" Tab.ColumnB = @fildB");
                }

                if (projectEntity.FieldC.Equals("A"))
                {
                    parameters.Add("FieldCFrom", "05:45:00");
                    parameters.Add("FieldCTo", "15:00:00");
                }
                else
                {
                    parameters.Add("FieldCFrom", "15:00:00");
                    parameters.Add("FieldCTo", "23:59:59");
                }

                whereConditions.Add(" (TIME(Tab.DateInclusion) >= @FieldCFrom AND TIME(Tab.DateInclusion) <= @FieldCTo) ");

                parameters.Add("DateFrom", projectEntity.DateFrom);
                parameters.Add("DateTo", projectEntity.DateTo);

                StringBuilder filterDate = new StringBuilder();
                filterDate.AppendFormat(@" DATE(Tab.DateInclusion) >= @DateFrom AND DATE(Tab.DateInclusion) <= @DateTo");

                whereConditions.Add(filterDate.ToString());

		parameters.Add("ListCustomers", projectEntity.ListCustomers);
		whereConditions.Add(" Tab.Customer IN @ListCustomers ")
				
                query.AppendFormat(" WHERE {0}", string.Join(" AND ", whereConditions.ToArray()));

                query.AppendFormat(@"ORDER BY <ListOfFields>");

                List<ProjectEntity> list = db.Query<ProjectEntity>(query.ToString(), parameters).ToList();

                return lista;
            }
        }
     }
}
