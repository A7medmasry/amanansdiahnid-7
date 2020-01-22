import { auth } from "@/plugins/firebase";
export default function ({ redirect }) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      return redirect('/')
    }
  });
}
