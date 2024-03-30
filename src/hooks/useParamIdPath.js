export default function useParamIdPath() {
  const router = useRouter();

  return function getPathByParamId(holderName, id) {
    const holaderRoute = router.resolve({ name: holderName });
    return holaderRoute.fullPath + '/' + id;
  };
}
