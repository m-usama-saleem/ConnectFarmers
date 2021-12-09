
export const UnitInformationView = () => {
    const { t } = useTranslation();
    const { culture } = useContext(LocalStorageContext)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        loaderProps: {
            style: {}
        },
        indicator: <ThreeDots width="50" />,
    });

    const { GetUnitInformation } = UnitInformationService();
    const [unitInformationData, setUnitInformationData] = useState({});

    useEffect(async () => {

        var result = await GetUnitInformation();
        if (result.isError === false) {
            setUnitInformationData(result.data);
            setTimeout(function () {
                setIsLoading(false);
            }, 1000);
        } else {
            setError(result.data.message)
            setTimeout(function () {
                setIsLoading(false);
            }, 1000);
        }
    }, []);

    const classes = useStyle();

    if (isLoading) {
        return (
            <section {...containerProps} style={{
                backgroundPosition: '50%', textAlign: 'center', height: '80vh',
                lineHeight: '40'
            }}>
                {indicatorEl}
            </section>
        )
    } else {
        return (
            <Container dir={culture.textDirection} className={classes.conatinerPadding} maxWidth="sx">
                <Typography className={classes.heading} variant="h2">{t('UnitInformation')}</Typography>
                <Grid container maxWidth="lg" spacing={0}>
                    <Grid item className={classes.gridMain} container xs={7}>
                        {error !== "" ?
                            <Grid className={classes.gridColHeading} item xs={12}>
                                <AlertNotification
                                    severity="error"
                                    message={error} />
                            </Grid>
                            : null}
                        {/*{isDataFetched ? (<>*/}
                        <Grid className={classes.gridColHeading} item xs={3}>{t('UnitID')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.UnitID}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('UnitSerial')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.UnitSerial}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('UnitIPAddress')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.UnitIPAddress}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('MAC Address')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.MacAddress}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('Server')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.ServerURL}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('FtpHostUrl')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.FtpURL}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('DailyReboot')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.DailyReboot == 1 ? "Enabled" : "Disabled"}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('RebootTime')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.RebootTime}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('IrsaVersion')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.IrsaTransitVersion}</Grid>

                        <Grid className={classes.gridColHeading} item xs={3}>{t('WebUIVersion')}</Grid>
                        <Grid className={classes.gridCol} item xs={9}>{unitInformationData.WebUIVersion}</Grid>


                    </Grid>
                    <Grid item xs={4}>
                        <img className={classes.MdiImage} src={mdImage} />
                    </Grid>

                </Grid>
            </Container>)
    }


}