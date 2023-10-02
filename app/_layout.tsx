import {Link, Stack} from 'expo-router';
import {ConvexProvider, ConvexReactClient} from "convex/react";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';


const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!,
    {
        unsavedChangesWarning: false
    })

export default function RootLayoutNav() {

    return (
        <ConvexProvider client={convex}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#EEA217',
                    },
                    headerTintColor: '#fff',
                }}>

                <Stack.Screen name="index"
                              options={{
                                  headerTitle: 'My Chats',
                                  headerRight: () => (
                                      <Link href={'/(modal)/create'} asChild>
                                          <TouchableOpacity>
                                              <Ionicons name={'add'} size={32} color={'white'}/>
                                          </TouchableOpacity>
                                      </Link>

                                  ),
                              }}/>

                <Stack.Screen name="(modal)/create"
                              options={{
                                  presentation: 'modal',
                                  headerTitle: 'Start a new chat',
                              }}/>

                <Stack.Screen name="(chat)/[chatId]"
                              options={{

                                  headerTitle: 'CHatId',
                              }}/>

            </Stack>
        </ConvexProvider>

    );
}
