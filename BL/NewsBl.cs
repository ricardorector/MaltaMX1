namespace BL
{
    using DAL;
    using System;

    /// <summary>
    /// Getiona los logs de la app
    /// </summary>
    public class NewsBl : BaseBl
    {
        #region Members

        private NewsDal dal;

        #endregion

        #region Builder

        public NewsBl()
        {
            this.dal = new NewsDal();
        }

        #endregion

        #region Methods

        #region PUblic

        public DTO.Slider Slider(int Index)
        {
            this.IsCorrect = false;
            this.Message = "Información obtenida exitosamente";

            try
            {
                var reult = this.dal.Slider(Index);

                this.IsCorrect = true;

                return reult;
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;

                return new DTO.Slider();
            }
        }

        #endregion

        #endregion
    }
}
