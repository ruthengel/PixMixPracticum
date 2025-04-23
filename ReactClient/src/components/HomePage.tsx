import { Box, Button, Typography, Container, Grid, Card, CardContent, Dialog, DialogContent, IconButton, Link } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useSelector } from "react-redux";
import { EmojiEvents } from "@mui/icons-material";
import { RootState } from "./stores/Store";


const GradientText = styled("span")({
    background: "linear-gradient(270deg, #00A0A8, #7D2AE8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
});

const StyledButton = styled(Button)({
    backgroundColor: "#8B3DFF",
    color: "white",
    fontWeight: "bold",
    padding: "10px 50px",
    fontSize: "1rem",
    borderRadius: "8px",
    marginTop: 15,
    transition: "transform 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
        backgroundColor: "#7731D8",
    },
});

const AnimatedCard = styled(Card)({
    borderRadius: "15px",
    transition: "transform 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
    },
    padding: "20px",
    textAlign: "center",
    boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
});

const HomePage = () => {

    const token = useSelector((state: RootState) => state.token.token);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        if (token)
            navigate('start')
        else
            setOpen(true)
    }

    return (

        < Box >
            <Container maxWidth="md" sx={{ width: '100vw', height: '100vh', marginTop: 10, textAlign: "center", py: 10 }}>
                <Typography variant="h1" gutterBottom sx={{ fontSize: "6rem" }}>
                    ?מה תרצו <GradientText>לעצב </GradientText>היום
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 5, fontSize: "2rem" }} gutterBottom>
                    !הפלטפורמה המושלמת ליצירת קולאז'ים בקלות
                </Typography>
                <StyledButton onClick={handleOpen}>צור עיצוב</StyledButton>
            </Container>

            <Container maxWidth="lg" sx={{ py: 5, marginTop: -40, marginRight: 70 }}>
                <Typography variant="h4" fontWeight="700" sx={{ marginRight: -9 }}>התאמה מושלמת לכולם</Typography>
                <Grid container spacing={-13} marginTop={6} >
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }} >
                        <AnimatedCard sx={{ display: 'flex', flexDirection: 'column', height: '250px', width: '280px', backgroundColor: '#e7dbff', border: '1px solid #d6c2ff' }} >
                            <Box sx={{ width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: "white", boxShadow: 2 }}>
                                <EmojiEvents sx={{ fontSize: 30, color: "gold" }} />
                            </Box>
                            <CardContent sx={{ textAlign: 'right', flex: 1, mt: -2 }}>
                                <Typography>PixMix Free</Typography>
                                <Typography mt={2}>.לעיצוב או לעבודה בכל נושא</Typography>
                            </CardContent>
                            <Button sx={{ mt: 6.5, right: 0, borderRadius: '8px', whiteSpace: 'nowrap', backgroundColor: "#8B3DFF", color: "white", height: '40px', fontWeight: "bold", padding: '8px 120px', "&:hover": { backgroundColor: "#7731D8", } }}>התחל לעצב</Button>

                        </AnimatedCard>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <AnimatedCard sx={{ display: 'flex', flexDirection: 'column', height: '250px', width: '280px', backgroundColor: '#e7dbff', border: '1px solid #d6c2ff' }}>
                            <Box sx={{ width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: "white", boxShadow: 2, flexShrink: 0 }}>
                                <EmojiEvents sx={{ fontSize: 30, color: "gold" }} />
                            </Box>
                            <CardContent sx={{ textAlign: 'right', flex: 1, mt: -2 }}>
                                <Typography>PixMix Pro</Typography>
                                <Typography mt={2}>.להרחבת המותג או הפרויקטים החשובים שלכם באמצעות תכונות פרימיום</Typography>
                            </CardContent>
                            <Button sx={{ mt: 3.5, right: 1, borderRadius: '8px', whiteSpace: 'nowrap', backgroundColor: "#8B3DFF", color: "white", height: '40px', fontWeight: "bold", padding: '8px 120px', "&:hover": { backgroundColor: "#7731D8", }, }}>התחל לעצב</Button>
                        </AnimatedCard>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <AnimatedCard sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '250px', width: '280px', backgroundColor: '#40576D12', border: '1px solid #394C6026' }}>
                            <CardContent sx={{ textAlign: 'right', flex: 1, mt: 6 }}>
                                <Typography>PixMix</Typography>
                                <Typography mt={2}>כנסו אלינו ולא תפסידו</Typography>
                                <Button sx={{ mt: 13, right: 21, borderRadius: '8px', whiteSpace: 'nowrap', backgroundColor: "#8B3DFF", color: "white", height: '40px', fontWeight: "bold", padding: '8px 110px', "&:hover": { backgroundColor: "#7731D8", }, }}>התחל לעצב</Button>
                            </CardContent>
                        </AnimatedCard>
                    </Grid>


                </Grid>
            </Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                <Box sx={{}}>
                    <img
                        src="/images/benefits-magic-studio-universal (2).webp" // עדכון נתיב לתמונה
                        style={{ width: "630px", height: "100%", borderRadius: "15px", marginLeft: -50, }} // הגדלת התמונה
                    />
                </Box>
                <Box sx={{ textAlign: 'right', marginTop: 15, marginRight: -6 }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.333 13.144a12.884 12.884 0 0 1 .927-.235l.209-.044a.5.5 0 0 0 0-1 14.663 14.663 0 0 1-1.138-.276c-2.8-.815-4.275-2.382-5.082-5.113a13.224 13.224 0 0 1-.103-.37l-.084-.331a16.311 16.311 0 0 1-.12-.539.493.493 0 0 0-.473-.371.493.493 0 0 0-.475.376 14.724 14.724 0 0 1-.366 1.45l-.002.006c-.832 2.648-2.348 4.104-5.021 4.888a12.601 12.601 0 0 1-.927.235l-.21.045a.5.5 0 0 0 0 1 14.723 14.723 0 0 1 1.14.275c2.809.813 4.278 2.362 5.082 5.105l.083.299.02.077c.019-.016.06.332.08.317.023.098.046.198.068.3l.009.04.036.174a.493.493 0 0 0 .483.413.493.493 0 0 0 .477-.387 16.114 16.114 0 0 1 .196-.859 12.797 12.797 0 0 1 .17-.593l.002-.005c.832-2.645 2.346-4.094 5.019-4.877Zm-5.864 2.934a7.982 7.982 0 0 1 1.51-2.162 7.922 7.922 0 0 1 2.193-1.55 7.877 7.877 0 0 1-2.246-1.612 8.07 8.07 0 0 1-1.454-2.115 8.007 8.007 0 0 1-1.511 2.168A7.927 7.927 0 0 1 8.77 12.36a7.841 7.841 0 0 1 2.233 1.592 7.99 7.99 0 0 1 1.466 2.127Zm4.293-10.43a.153.153 0 0 0-.153.152h.004c0 .084.062.14.145.156l.023.006.032.007.008.003a3.2 3.2 0 0 1 1.104.508 2.487 2.487 0 0 1 .284.246l.003.002A2.521 2.521 0 0 1 18.872 8a4.606 4.606 0 0 1 .015.076.153.153 0 0 0 .152.154v-.004c.084 0 .14-.062.156-.145l.006-.023.008-.032c0-.002 0-.005.002-.008.113-.432.284-.801.508-1.104a2.479 2.479 0 0 1 .425-.444 2.521 2.521 0 0 1 1.172-.517.15.15 0 0 0 .15-.153c0-.084-.063-.14-.145-.156l-.024-.006-.032-.007-.008-.003a3.197 3.197 0 0 1-1.105-.509 2.5 2.5 0 0 1-.283-.245l-.002-.002a2.36 2.36 0 0 1-.158-.177 2.521 2.521 0 0 1-.517-1.172.153.153 0 0 0-.153-.153v.004c-.084 0-.14.062-.156.144l-.006.024-.007.032-.003.008a3.197 3.197 0 0 1-.508 1.104 2.48 2.48 0 0 1-.246.284l-.002.002a2.362 2.362 0 0 1-.177.158 2.52 2.52 0 0 1-1.115.506 3.248 3.248 0 0 1-.057.011ZM6.848 19.66a2.074 2.074 0 0 1 .93-.478 3.17 3.17 0 0 1 .14-.032.218.218 0 0 0 0-.436 5.028 5.028 0 0 1-.092-.028c-.386-.124-.706-.277-.963-.482a1.9 1.9 0 0 1-.225-.21 2.073 2.073 0 0 1-.47-.921 3.1 3.1 0 0 1-.031-.14.218.218 0 1 0-.436 0 5.43 5.43 0 0 1-.029.092c-.123.386-.277.706-.481.963a1.983 1.983 0 0 1-.21.225c-.242.22-.542.376-.922.47a3.036 3.036 0 0 1-.14.031.218.218 0 0 0 0 .436l.093.03c.385.122.705.276.962.48a2.105 2.105 0 0 1 .217.202l.008.009c.22.241.376.541.47.921a3.1 3.1 0 0 1 .032.14.218.218 0 0 0 .436 0l.028-.093c.124-.385.277-.705.482-.962a1.9 1.9 0 0 1 .201-.217Z" fill="currentColor"></path><path d="M9.6 5.613C7.91 5.466 6.98 4.874 6.484 3.7c-.179-.423-.304-.917-.384-1.5 0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.08.583-.205 1.077-.384 1.5C4.821 4.874 3.891 5.466 2.2 5.613c-.1 0-.2.1-.2.2s.1.2.2.2c2.1.4 3.2 1.187 3.5 3.387 0 .1.1.2.2.2s.2-.1.2-.2c.3-2.2 1.4-2.987 3.5-3.387.1 0 .2-.1.2-.2s-.1-.2-.2-.2Z" fill="currentColor"></path></svg>
                    <Typography mt={1} fontWeight="700" variant="h4">AI לקדם את היצירתיות בעזרת </Typography>
                    <Typography mt={2}>.AI הגדירו מחדש את האופן שבו אתם יוצרים בעזרת חבילת הכלים שלנו המופעלים על ידי</Typography>
                    <Typography >בעזרת 'מדיה קסם' או שנו את התמונות שלכם בעזרת 'עריכת קסם' ועוד.ד AI צרו תמונות</Typography>
                    <Button onClick={handleOpen} sx={{ mt: 3, borderRadius: '8px', backgroundColor: "#8B3DFF", color: "white", height: '40px', fontWeight: "bold", padding: '8px 16px', "&:hover": { backgroundColor: "#7731D8", }, }}
                    >התחל לעצב</Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginLeft: -5 }}>
                <Box sx={{ textAlign: 'right', marginRight: 10, marginTop: 10 }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M28.996 14.696c.003.1.004.202.004.304 0 5.68-4.581 10.288-10.25 10.333-.022.01-.058.026-.11.055-.148.08-.345.208-.585.384-.477.352-1.043.833-1.598 1.33-.551.494-1.074.987-1.462 1.357l-.194.186c-.11.103-.203.193-.276.262a7.69 7.69 0 0 1-.15.139 1.669 1.669 0 0 1-.09.075h-.001c-.012.01-.074.058-.158.101h-.001a1.006 1.006 0 0 1-1.168-.182 1 1 0 0 1-.292-.707v-3.02C7.269 24.967 3 20.482 3 15 3 9.293 7.626 4.667 13.333 4.667h5.334c.264 0 .525.01.784.03a7.281 7.281 0 0 0-.664 1.97h-5.454a8.333 8.333 0 1 0 0 16.666h1.332v2.695c.148-.137.302-.276.457-.416a24.946 24.946 0 0 1 1.747-1.45c.276-.203.556-.392.82-.534.22-.12.584-.295.978-.295a8.333 8.333 0 0 0 8.329-8.067 7.283 7.283 0 0 0 2-.57Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M25 11.667a1 1 0 1 0 2 0V9h2.666a1 1 0 1 0 0-2H27V4.333a1 1 0 1 0-2 0V7h-2.667a1 1 0 1 0 0 2H25v2.667Z" fill="currentColor"></path></svg>
                    <Typography mt={1} fontWeight="700;" variant="h4">לעצב עם אחרים</Typography>
                    <Typography mt={2}>.הזמינו חברים ובני משפחה לעצב איתכם, או הגדירו את כל הצוות לעבוד יחד</Typography>
                    <Typography>,התכונות שלנו לשיתוף פעולה מאפשרות לכם להעיר ולעבוד בזמן אמת על מצגות, לוחות חכמים</Typography>
                    <Typography>.סרטונים או אפילו תכנון מסיבת יום הולדת</Typography>
                    <Box sx={{}}>
                        <Button sx={{ marginRight: 2, mt: 3, borderRadius: '8px', backgroundColor: "white", color: "black", border: '0.5px solid #394C6026', height: '40px', fontWeight: "bold", padding: '8px 16px' }}
                        >התחלת תקופת נסיון חינם עבור צוותים </Button>
                        <Button onClick={handleOpen} sx={{ mt: 3, borderRadius: '8px', backgroundColor: "#8B3DFF", color: "white", height: '40px', fontWeight: "bold", padding: '8px 16px', "&:hover": { backgroundColor: "#7731D8", }, }}
                        >התחל לעצב</Button>
                    </Box>

                </Box>
                <Box sx={{}}>
                    <img
                        src="/images/benefits-together-universal.webp" // עדכון נתיב לתמונה
                        style={{ width: "630px", height: "100%", borderRadius: "15px", marginTop: 15, marginRight: -50 }} // הגדלת התמונה
                    />
                </Box>
            </Box>

            <div style={{ width: '100%', height: '0.5px', backgroundColor: '#394C6026', marginTop: 150 }}></div>

            <Box sx={{ marginTop: 8 }}>
                <Typography variant="h4" fontWeight="700">התוכנית שעושה את העבודה</Typography>
                <Typography mt={1}>PixMix Teams העצימו את כולם לעצב ביחד באמצעות התוכנית</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, marginLeft: -5 }}>
                <Box sx={{ textAlign: 'right', marginLeft: 20, marginTop: 20 }}>
                    <Typography mt={1} fontWeight="700" variant="h6">AI יעילות המונעת על ידי</Typography>
                    <Typography > .ליצירת העתק, תבניות ועריכת סרטונים תואמים למותגAI מינוף</Typography>
                    <Typography mt={1} fontWeight="700" variant="h6">הביאו את המותג פנימה</Typography>
                    <Typography>.הגדירו ערכות ותבניות מותג עבור הצוות כדי שיעצבו באמצעותם</Typography>
                    <Typography mt={1} fontWeight="700" variant="h6">תזרימי אישורים יפים</Typography>
                    <Typography>.שליטה קלה בהרשאות אינדיווידואליות, הקצאת משימות ושיתוף עבודות</Typography>
                    <Box sx={{}}>
                        <Button sx={{ mt: 3, borderRadius: '8px', backgroundColor: "#8B3DFF", color: "white", height: '40px', fontWeight: "bold", padding: '8px 16px', "&:hover": { backgroundColor: "#7731D8", } }}
                        >PixMix-לגלות את הצוותים ב</Button>
                    </Box>

                </Box>
                <Box sx={{}}>
                    <img
                        src="/images/teams-universal.webp" // עדכון נתיב לתמונה
                        style={{ width: "630px", height: "100%", borderRadius: "15px", marginTop: 15, marginRight: -30 }} // הגדלת התמונה
                    />
                </Box>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { width: '600px', height: '150px', borderRadius: '12px' } }}>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <p>PixMixברוך הבא ל</p>
                    <p>כדי להמשיך, אנא התחבר או הירשם אם אין לך חשבון.</p>
                </DialogContent>
                <IconButton sx={{ position: "absolute", top: 100, right: 280, color: "black" }} onClick={() => setOpen(false)}>
                    <ThumbUpAltIcon />
                </IconButton>
            </Dialog>

            <Box sx={{ width: '100%', marginTop: 10, backgroundColor: 'white', padding: '20px', textAlign: 'center', borderTop: '1px solid #ddd', }}           >
                <Typography variant="body2" color="text.secondary">
                    2052 | RE | &copy;
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Link href="#" underline="none" color="inherit" sx={{ "&:hover": { color: "#7731D8", } }} >
                        תנאי שימוש
                    </Link> |
                    <Link href="#" underline="none" color="inherit" sx={{ "&:hover": { color: "#7731D8", } }} > פרטיות
                    </Link>
                </Typography>
            </Box>


        </Box >



    );
}
export default HomePage